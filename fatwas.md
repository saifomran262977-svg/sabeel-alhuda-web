---
layout: default
title: الفتاوى
subtitle: "فتاوى علمية محررة على منهج أهل السنة والجماعة"
permalink: /fatwas/
description: "مجموعة من الفتاوى العلمية المحررة في العقيدة والفقه والمنهج — مكتبة سبيل الهدى."
---

<div class="page-header">
  <h1 class="page-title">الفتاوى</h1>
  <p class="page-subtitle">{{ page.subtitle }}</p>
</div>

{% include search-box.html %}

<!-- ═══ الفلاتر ═══ -->
<div class="filters-row">
  <button class="filter-btn active" data-filter="all">الكل</button>
  
  <!-- التصنيف المميز (يظهر أولاً) -->
  <button class="filter-btn" data-filter="مواقفي وردودي" style="border-color: var(--gold); color: var(--gold); font-weight: bold;">⭐ مواقفي وردودي</button>

  <!-- باقي التصنيفات -->
  {% assign fatwa_cats = site.fatwas | map: 'category' | uniq | sort %}
  {% for cat in fatwa_cats %}
    {% if cat and cat != "" and cat != "مواقفي وردودي" %}
      <button class="filter-btn" data-filter="{{ cat }}">{{ cat }}</button>
    {% endif %}
  {% endfor %}
</div>

<!-- ═══ قائمة الفتاوى ═══ -->
<div class="fatwas-list" id="fatwasList">
  {% assign sorted_fatwas = site.fatwas | sort: 'date' | reverse %}
  {% for fatwa in sorted_fatwas %}
    <div class="fatwa-wrap" data-category="{{ fatwa.category | default: '' }}">
      <a href="{{ fatwa.url | relative_url }}" class="fatwa-item">
        <h3 class="fatwa-q">{{ fatwa.title }}</h3>
        {% if fatwa.description %}
          <p class="fatwa-a">{{ fatwa.description | truncate: 160 }}</p>
        {% endif %}
        {% if fatwa.category %}
          <span class="meta-pill" style="margin-top:8px;display:inline-block;">{{ fatwa.category }}</span>
        {% endif %}
      </a>
    </div>
  {% endfor %}
</div>

{% if site.fatwas.size == 0 %}
  <p class="empty-state">
    لا توجد فتاوى بعد. أضف أول فتوى من مجلد <code>_fatwas/</code>.
  </p>
{% endif %}

<!-- ═══ سكربت الفلترة ═══ -->
<script>
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.fatwa-wrap');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      cards.forEach(function (card) {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
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

.fatwa-wrap {
  margin-bottom: 12px;
  transition: opacity 0.3s ease;
}
</style>
