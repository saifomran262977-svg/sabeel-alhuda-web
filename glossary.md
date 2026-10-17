---
layout: page
title: فحص المصطلحات
permalink: /glossary/
---

<p>عدد المصطلحات اللي جيت هاب شايفها: {{ site.terms | size }}</p>

{% for term in site.terms %}
  <div style="background: yellow; color: black; padding: 10px; margin: 10px;">
    <strong>العنوان:</strong> {{ term.title }} <br>
    <strong>المحتوى:</strong> {{ term.content }}
  </div>
{% endfor %}
