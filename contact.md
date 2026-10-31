---
layout: page
title: تواصل معنا
subtitle: "يسعدنا تواصلك لأي استفسار أو سؤال"
permalink: /contact/
description: "تواصل معي عبر الواتساب لأي استفسار عن الكتب أو الفتاوى."
---

## نرحب بتواصلك 🌿

إذا كان لديك:

- **سؤال شرعي** تريد إجابة عليه
- **استفسار** عن كتاب من الكتب
- **طلب كتاب** غير موجود في المكتبة
- **ملاحظة أو اقتراح** لتطوير الموقع
- **رغبة في نشر كتاب** من مؤلفاتك

فلا تتردد في التواصل معنا مباشرة عبر الواتساب.

---

<div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 40px 0;">
  
  <!-- زرار الواتساب -->
  <a href="https://wa.me/{{ site.contact.whatsapp }}" target="_blank" rel="noopener" class="btn btn-primary" style="font-size: 18px; padding: 16px 30px; display: inline-flex; align-items: center; gap: 8px;">
    💬 تواصل عبر واتساب
  </a>

  <!-- زرار التليجرام -->
  {% if site.contact.telegram and site.contact.telegram != "" %}
  <a href="https://t.me/{{ site.contact.telegram }}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size: 18px; padding: 16px 30px; display: inline-flex; align-items: center; gap: 8px; border-color: #29b6f6; color: #29b6f6;">
    ✈️ تواصل عبر تليجرام
  </a>
  {% endif %}

</div>

---

## طرق التواصل الأخرى

{% if site.contact.telegram and site.contact.telegram != "" %}
**تليجرام:** [@{{ site.contact.telegram }}](https://t.me/{{ site.contact.telegram }})
{% endif %}

{% if site.contact.email and site.contact.email != "" %}
**البريد الإلكتروني:** [{{ site.contact.email }}](mailto:{{ site.contact.email }})
{% endif %}

**واتساب:** [+{{ site.contact.whatsapp }}](https://wa.me/{{ site.contact.whatsapp }})

---

## ملاحظات مهمة

- **أوقات الرد:** قد يتأخر الرد قليلاً في بعض الأحيان بسبب انشغالنا، فنتقدم باعتذارنا مسبقًا.
- **الأسئلة الشرعية:** نرجو أن تكون واضحة ومحددة، ونعتذر عن الإجابة على الأسئلة التي تحتاج تفصيلاً شخصيًا.
- **حقوق الكتب:** جميع الكتب المنشورة على الموقع محفوظة لمؤلفيها، ونرجو من الجميع احترام الحقوق.

---

<div style="text-align: center; margin-top: 40px; padding: 30px; background: var(--bg-3); border-radius: var(--radius); border: 1px solid var(--border);">
  <p style="font-family: var(--font-heading); font-size: 24px; color: var(--gold); margin: 0;">
    «الدال على الخير كفاعله»
  </p>
  <p style="color: var(--text-3); margin-top: 12px; margin-bottom: 0;">
    جزاك الله خيرًا على تواصلك واهتمامك
  </p>
</div>
