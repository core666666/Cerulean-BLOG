/**
 * 现代简约 + 微动效 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 滚动动画初始化 ==========
    initScrollAnimations();
    
    // ========== 导航栏滚动效果 ==========
    initNavbarScrollEffect();
    
    // ========== 平滑滚动 ==========
    initSmoothScroll();
    
    // ========== 文章卡片动画 ==========
    initPostCardAnimations();
    
    // ========== 搜索框动效 ==========
    initSearchAnimations();
    
    // ========== 按钮点击效果 ==========
    initButtonEffects();
    
    // ========== 页面加载完成动画 ==========
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/**
 * 滚动动画
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // 观察所有文章项
    document.querySelectorAll('.post-list-item').forEach((item, index) => {
        item.classList.add('scroll-animate');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

/**
 * 导航栏滚动效果
 */
function initNavbarScrollEffect() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.site-header');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加/移除滚动类
        if (scrollTop > 100) {
            navbar.classList.add('site-header-nav-scrolled');
        } else {
            navbar.classList.remove('site-header-nav-scrolled');
        }
        
        // 滚动方向检测（可选：隐藏/显示导航栏）
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 文章卡片动画
 */
function initPostCardAnimations() {
    const cards = document.querySelectorAll('.post-list-item');
    
    cards.forEach(card => {
        // 鼠标进入效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // 鼠标离开效果
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 点击波纹效果
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

/**
 * 创建波纹效果
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(65, 131, 196, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * 搜索框动效
 */
function initSearchAnimations() {
    const searchInput = document.querySelector('.search-container input');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.05)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.style.transform = 'scale(1)';
        });
        
        // 输入时的动效
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    }
}

/**
 * 按钮点击效果
 */
function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击动画类
            this.classList.add('clicked');
            
            // 创建波纹效果
            createRippleEffect(e, this);
            
            // 移除动画类
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
        
        // 悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * 添加CSS动画关键帧
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .clicked {
            transform: scale(0.95) !important;
        }
        
        .search-container.focused {
            transform: scale(1.02);
        }
        
        .has-content {
            border-color: #4183c4 !important;
        }
        
        .loaded {
            opacity: 1;
        }
        
        /* 页面加载动画 */
        body:not(.loaded) {
            opacity: 0;
        }
        
        /* 滚动条美化 */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }
    `;
    document.head.appendChild(style);
}

// 添加动画样式
addAnimationStyles();

/**
 * 性能优化：节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 导出函数供其他脚本使用
window.ModernAnimations = {
    createRippleEffect,
    throttle,
    debounce
};
