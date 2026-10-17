---
layout: page
title: قاموس المصطلحات
subtitle: "معاني المصطلحات الشرعية والفرق والعقائد"
permalink: /glossary/
---

<div style="margin-bottom: 30px;">
  <p style="color: var(--text-2); font-size: 16px; line-height: 1.8;">
    هذا القاموس يشرح أهم المصطلحات الشرعية والعقدية. اضغط على المصطلح لقراءة تعريفه.
  </p>
</div>

{% for term in site.terms %}
<details class="term-card">
  <summary>{{ term.title }}</summary>
  <div class="term-content">
    {{ term.content | markdownify }}
  </div>
</details>
{% endfor %}

<style>
.term-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}
.term-card[open] {
  border-color: var(--gold);
  background-color: var(--bg-2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.term-card summary {
  padding: 18px 24px;
  cursor: pointer;
  font-family: var(--font-sub);
  font-size: 18px;
  color: var(--gold);
  font-weight: 600;
  list-style: none;
  position: relative;
}
.term-card summary::-webkit-details-marker {
  display: none;
}
.term-card summary::after {
  content: '+';
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: var(--text-3);
  transition: transform 0.3s ease;
}
.term-card[open] summary::after {
  content: '−';
  color: var(--gold);
}
.term-card summary:hover {
  color: var(--gold-2);
}
.term-content {
  padding: 0 24px 20px 24px;
  color: var(--text-2);
  font-size: 16px;
  line-height: 1.9;
  border-top: 1px solid var(--border);
  padding-top: 16px;
  margin-top: 5px;
}
</style>
