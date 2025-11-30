// Miku 走路小动画 - 对话气泡文字切换

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const bubble = document.querySelector('.speech-bubble');
        if (!bubble) return;
        
        let isHovering = false;
        let timeoutId = null;
        
        const mikuSprite = document.querySelector('.miku-sprite');
        
        // 监听鼠标悬停
        if (mikuSprite) {
            mikuSprite.addEventListener('mouseenter', function() {
                isHovering = true;
                bubble.textContent = '放开我';
                if (timeoutId) clearTimeout(timeoutId);
            });
            
            mikuSprite.addEventListener('mouseleave', function() {
                isHovering = false;
                bubble.textContent = '等等我';
                scheduleNextSwitch();
            });
        }
        
        // 调度下一次切换
        function scheduleNextSwitch() {
            if (timeoutId) clearTimeout(timeoutId);
            
            if (bubble.textContent === '等等我') {
                // 显示"等等我" 5秒后切换到"源小舞"
                timeoutId = setTimeout(function() {
                    if (!isHovering) {
                        bubble.textContent = '源小舞';
                        scheduleNextSwitch();
                    }
                }, 5000);
            } else {
                // 显示"源小舞" 1秒后切换到"等等我"
                timeoutId = setTimeout(function() {
                    if (!isHovering) {
                        bubble.textContent = '等等我';
                        scheduleNextSwitch();
                    }
                }, 1000);
            }
        }
        
        // 启动切换
        scheduleNextSwitch();
    });
})();
