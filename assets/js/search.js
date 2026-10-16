/* ═══════════════════════════════════════════════════════════
   صليل الصوارم — محرك البحث الداخلي
   بحث فوري في الكتب والفتاوى
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  let searchIndex = null;
  let searchPromise = null;

  // ─── جلب فهرس البحث مرة واحدة ───
  function loadIndex() {
    if (searchPromise) return searchPromise;

    const baseUrl = document.querySelector('meta[name="baseurl"]')?.content
      || window.location.pathname.split('/').slice(0, -1).join('/');

    // نحاول نحدد baseurl من رابط الصفحة الرئيسية
    const url = getSearchUrl();

    searchPromise = fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        searchIndex = data;
        return data;
      })
      .catch(function (err) {
        console.warn('تعذر تحميل فهرس البحث:', err);
        return [];
      });

    return searchPromise;
  }

  // ─── استخراج مسار search.json بطريقة موثوقة ───
  function getSearchUrl() {
    // نستخرج الـ baseurl من أي رابط assets/css في الصفحة
    const cssLink = document.querySelector('link[href*="/assets/css/style.css"]');
    if (cssLink) {
      const href = cssLink.getAttribute('href');
      const base = href.replace('/assets/css/style.css', '');
      return base + '/search.json';
    }
    return '/search.json';
  }

  // ─── تطبيع النص العربي للبحث ───
  function normalize(str) {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .replace(/[\u064B-\u0652]/g, '')     // إزالة التشكيل
      .replace(/[أإآا]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[^\w\u0600-\u06FF\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ─── تنفيذ البحث ───
  function performSearch(query) {
    if (!searchIndex) return [];
    const q = normalize(query);
    if (q.length < 2) return [];

    const terms = q.split(' ').filter(Boolean);

    const results = searchIndex.map(function (item) {
      const haystack = normalize(
        (item.title || '') + ' ' +
        (item.description || '') + ' ' +
        (item.author || '') + ' ' +
        (item.category || '') + ' ' +
        ((item.tags || []).join(' '))
      );

      let score = 0;
      terms.forEach(function (term) {
        if (!haystack.includes(term)) return;
        // عنوان يحوي الكلمة → وزن أعلى
        if (normalize(item.title || '').includes(term)) score += 10;
        if (normalize(item.description || '').includes(term)) score += 3;
        if (normalize(item.category || '').includes(term)) score += 2;
        if (normalize((item.tags || []).join(' ')).includes(term)) score += 2;
        score += 1;
      });

      return { item: item, score: score };
    })
    .filter(function (r) { return r.score > 0; })
    .sort(function (a, b) { return b.score - a.score; })
    .slice(0, 15)
    .map(function (r) { return r.item; });

    return results;
  }

  // ─── عرض النتائج ───
  function renderResults(results, query) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (!query || query.length < 2) {
      container.innerHTML = '<p class="search-empty">اكتب حرفين على الأقل للبحث...</p>';
      return;
    }

    if (results.length === 0) {
      container.innerHTML = '<p class="search-empty">لا توجد نتائج مطابقة لـ «' + escapeHtml(query) + '»</p>';
      return;
    }

    container.innerHTML = results.map(function (item) {
      const title = escapeHtml(item.title || '');
      const desc = escapeHtml((item.description || '').slice(0, 120));
      const type = item.type === 'fatwa' ? 'فتوى' : 'كتاب';
      return (
        '<a href="' + item.url + '" class="search-result-item">' +
          '<h4>' + title + ' <span style="font-size:12px;color:var(--text-3);">— ' + type + '</span></h4>' +
          (desc ? '<p>' + desc + '</p>' : '') +
        '</a>'
      );
    }).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ─── فتح وإغلاق نافذة البحث ───
  function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadIndex();
    setTimeout(function () { if (input) input.focus(); }, 100);
  }

  function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── التهيئة عند تحميل الصفحة ───
  document.addEventListener('DOMContentLoaded', function () {

    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const boxTrigger = document.querySelector('.search-box-trigger');

    if (searchToggle) {
      searchToggle.addEventListener('click', openSearch);
    }

    if (boxTrigger) {
      boxTrigger.addEventListener('click', openSearch);
    }

    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeSearch();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
      // اختصار Ctrl+K أو Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    if (input) {
      let debounce;
      input.addEventListener('input', function () {
        clearTimeout(debounce);
        const q = input.value.trim();
        debounce = setTimeout(function () {
          if (!searchIndex) {
            loadIndex().then(function () {
              renderResults(performSearch(q), q);
            });
          } else {
            renderResults(performSearch(q), q);
          }
        }, 120);
      });
    }

    // تحميل الفهرس مسبقاً بعد 2 ثانية (تحسين الأداء)
    setTimeout(loadIndex, 2000);
  });

})();
