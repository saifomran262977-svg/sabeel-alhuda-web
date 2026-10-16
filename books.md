---
layout: default
title: الكتب
subtitle: "مكتبة صليل الصوارم — كتب علمية وردود دعوية"
permalink: /books/
description: "جميع الكتب العلمية والدعوية لمكتبة صليل الصوارم — تحميل وقراءة مباشرة."
---

<div class="page-header">
  <h1 class="page-title">الكتب</h1>
  <p class="page-subtitle">{{ page.subtitle }}</p>
</div>

{% include search-box.html %}

<!-- ═══ الفلاتر ═══ -->
<div class="filters-row">
  <button class="filter-btn active" data-filter="all">الكل</button>
  {% assign categories = site.books | map: 'category' | uniq | sort %}
  {% for cat in categories %}
    {% if cat and cat != "" %}
      <button class="filter-btn" data-filter="{{ cat }}">{{ cat }}</button>
    {% endif %}
  {% endfor %}
</div>

<!-- ═══ شبكة الكتب ═══ -->
<div class="books-grid" id="booksGrid">
  {% assign sorted_books = site.books | sort: 'date' | reverse %}
  {% for book in sorted_books %}
    <div class="book-card-wrap" data-category="{{ book.category | default: '' }}">
      {% include book-card.html book=book %}
    </div>
  {% endfor %}
</div>

{% if site.books.size == 0 %}
  <p class="empty-state">
    لا توجد كتب بعد. أضف أول كتاب من مجلد <code>_books/</code>.
  </p>
{% endif %}

<!-- ═══ سكربت الفلترة ═══ -->
<script>
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.book-card-wrap');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      cards.forEach(function (card) {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
</script>

<style>
.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 28px 0 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.filter-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-2);
  color: var(--text-2);
  padding: 9px 20px;
  border-radius: 20px;
  font-family: var(--font-sub);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--gold), var(--gold-3));
  color: var(--bg);
  border-color: var(--gold);
  box-shadow: 0 4px 18px rgba(212, 175, 55, 0.25);
}

.book-card-wrap {
  transition: opacity 0.3s ease;
}
</style>
