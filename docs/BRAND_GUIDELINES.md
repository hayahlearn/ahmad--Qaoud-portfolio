# دليل الهوية البصرية - موقع أحمد قاعود

## نظام الألوان

### Light Mode
| العنصر | القيمة | الاستخدام |
|--------|--------|----------|
| **الخلفية** | `bg-background` | slate-50 |
| **النصوص** | `text-foreground` | slate-900 |
| **Primary** | `bg-primary` | Navy Blue |
| **Accent** | `text-accent` | Gold/Amber |

### Dark Mode (Slate Premium)
| العنصر | القيمة | الاستخدام |
|--------|--------|----------|
| **الخلفية** | `bg-background` | slate-900 (220° 16% 10%) |
| **النصوص** | `text-foreground` | slate-50 |
| **Primary** | `bg-primary` | Amber (38° 92% 50%) |
| **Accent** | `text-accent` | Amber glow |

---

## Utility Classes المتاحة

### Gradients
```css
.bg-gradient-primary    /* Primary → Navy */
.bg-gradient-gold       /* Gold → Gold Light */
.bg-gradient-hero       /* Hero background */
.bg-gradient-cta        /* Primary → Navy Dark */
.bg-gradient-cta-warm   /* Accent → Orange */
.bg-gradient-hayah      /* Emerald → Teal → Cyan */
.bg-gradient-hayah-dark /* Emerald → Teal */
```

### Shadows
```css
.shadow-soft      /* Subtle shadow */
.shadow-card      /* Card shadow */
.shadow-elevated  /* Strong shadow */
```

### Effects
```css
.glow-gold        /* Gold glow */
.glass            /* Glassmorphism */
.hover-lift       /* Lift on hover */
```

---

## قواعد الاستخدام

### ✅ صحيح
```tsx
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="text-accent">
<div className="bg-gradient-cta text-primary-foreground">
```

### ❌ خطأ (تجنب hardcoded colors)
```tsx
<div className="bg-slate-900 text-white">
<div className="bg-amber-500">
<div className="text-navy">
```

---

## تطبيق حسب نوع الصفحة

### الصفحات العامة (Index, About, Services)
- استخدم `bg-primary`, `text-foreground`
- CTAs: `bg-gradient-cta`

### صفحات Hayah / التعليم الخاص
- استخدم `bg-gradient-hayah` للـ Hero
- CTAs: `bg-primary` أو `bg-gradient-hayah-dark`

### صفحات Case Studies
- يُسمح بألوان مميزة لكل case study
- استخدم CSS variables للنصوص
