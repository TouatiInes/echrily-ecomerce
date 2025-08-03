# 🎨 Echrily E-Commerce Design System

## 🎯 Brand Identity

### **Brand Name**: Echrily E-Commerce
### **Tagline**: "Shop with Style, Shop with Ease"

## 🎨 Color Palette

### **Primary Colors**
```css
--primary: #667eea          /* Main brand color */
--primary-dark: #764ba2     /* Darker variant */
--primary-light: #a8b5ff    /* Lighter variant */
```

### **Secondary Colors**
```css
--secondary: #f093fb        /* Accent color */
--secondary-dark: #f5576c   /* Darker accent */
--secondary-light: #fbc2eb  /* Lighter accent */
```

### **Neutral Colors**
```css
--background: #ffffff       /* Main background */
--surface: #f8fafc         /* Card backgrounds */
--border: #e2e8f0          /* Borders */
--text-primary: #1e293b    /* Main text */
--text-secondary: #64748b  /* Secondary text */
--text-muted: #94a3b8      /* Muted text */
```

### **Status Colors**
```css
--success: #10b981         /* Success states */
--warning: #f59e0b         /* Warning states */
--error: #ef4444           /* Error states */
--info: #3b82f6            /* Info states */
```

## 🔤 Typography

### **Font Family**
- **Primary**: Inter, system-ui, sans-serif
- **Secondary**: Poppins, sans-serif (for headings)

### **Font Sizes**
```css
--text-xs: 0.75rem     /* 12px */
--text-sm: 0.875rem    /* 14px */
--text-base: 1rem      /* 16px */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
--text-4xl: 2.25rem    /* 36px */
```

## 🖼️ Logo Usage

### **Main Logo**
- File: `/public/icons/logo.svg`
- Minimum size: 120x40px
- Use on light backgrounds

### **Logo Variations**
- **Horizontal**: For headers and navigation
- **Icon only**: For favicons and small spaces
- **Monochrome**: For single-color applications

## 🎯 Icons

### **Icon Set**
- **Style**: Outline icons with 2px stroke
- **Size**: 24x24px standard
- **Color**: Inherits from parent or uses currentColor

### **Available Icons**
- 🛒 Cart (`/public/icons/cart.svg`)
- 👤 User (`/public/icons/user.svg`)
- 🔍 Search (`/public/icons/search.svg`)
- ❤️ Heart (for favorites)
- ⭐ Star (for ratings)
- 📦 Package (for orders)

## 🎨 Component Styles

### **Buttons**
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 10px 22px;
}
```

### **Cards**
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## 📱 Responsive Design

### **Breakpoints**
```css
--mobile: 640px
--tablet: 768px
--laptop: 1024px
--desktop: 1280px
```

### **Grid System**
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Laptop**: 3 columns
- **Desktop**: 4 columns

## 🎭 Animation Guidelines

### **Transitions**
- **Duration**: 0.3s for most interactions
- **Easing**: ease-in-out for smooth feel
- **Hover effects**: Subtle scale (1.05) or translate

### **Loading States**
- **Skeleton screens** for content loading
- **Spinner animations** for actions
- **Progress bars** for multi-step processes

## 🖼️ Image Guidelines

### **Product Images**
- **Aspect Ratio**: 1:1 (square)
- **Resolution**: Minimum 500x500px
- **Format**: WebP with JPEG fallback
- **Background**: White or transparent

### **Hero Images**
- **Aspect Ratio**: 16:9 or 21:9
- **Resolution**: Minimum 1920x1080px
- **Optimization**: Compressed for web

## 🎨 Usage Examples

### **Header**
```jsx
<header className="bg-white shadow-sm border-b">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <img src="/icons/logo.svg" alt="Echrily" className="h-8" />
      <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-gray-700 hover:text-primary">Home</a>
        <a href="/products" className="text-gray-700 hover:text-primary">Products</a>
      </nav>
    </div>
  </div>
</header>
```

### **Product Card**
```jsx
<div className="card p-4">
  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
  <div className="flex items-center justify-between">
    <span className="text-2xl font-bold text-primary">${product.price}</span>
    <button className="btn-primary">Add to Cart</button>
  </div>
</div>
```

## 📋 Implementation Checklist

- [ ] Logo implemented in header
- [ ] Color variables defined in CSS
- [ ] Typography system applied
- [ ] Icon set integrated
- [ ] Button styles consistent
- [ ] Card hover effects working
- [ ] Responsive grid implemented
- [ ] Loading states designed
- [ ] Image optimization applied
