// Miku 走路小动画 - 对话气泡文字切换

(function() {
    let isHovering = false;
    let timeoutId = null;
    
    function initMikuWalker() {
        const bubble = document.querySelector('.speech-bubble');
        if (!bubble) return;
        
        const mikuSprite = document.querySelector('.miku-sprite');
        if (!mikuSprite) return;
        
        // 清理之前的定时器
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        
        // 重置状态
        isHovering = false;
        bubble.textContent = '等等我';
        
        // 移除旧的事件监听器（通过克隆节点）
        const newMikuSprite = mikuSprite.cloneNode(true);
        mikuSprite.parentNode.replaceChild(newMikuSprite, mikuSprite);
        
        // 重新获取气泡元素
        const newBubble = document.querySelector('.speech-bubble');
        
        // 监听鼠标悬停
        newMikuSprite.addEventListener('mouseenter', function() {
            isHovering = true;
            newBubble.textContent = '放开我';
            if (timeoutId) clearTimeout(timeoutId);
        });
        
        newMikuSprite.addEventListener('mouseleave', function() {
            isHovering = false;
            newBubble.textContent = '等等我';
            scheduleNextSwitch();
        });
        
        // 调度下一次切换
        function scheduleNextSwitch() {
            if (timeoutId) clearTimeout(timeoutId);
            
            if (newBubble.textContent === '等等我') {
                // 显示"等等我" 5秒后切换到"源小舞"
                timeoutId = setTimeout(function() {
                    if (!isHovering) {
                        newBubble.textContent = '源小舞';
                        scheduleNextSwitch();
                    }
                }, 5000);
            } else {
                // 显示"源小舞" 1秒后切换到"等等我"
                timeoutId = setTimeout(function() {
                    if (!isHovering) {
                        newBubble.textContent = '等等我';
                        scheduleNextSwitch();
                    }
                }, 1000);
            }
        }
        
        // 启动切换
        scheduleNextSwitch();
    }
    
    // 首次加载
    document.addEventListener('DOMContentLoaded', initMikuWalker);
    
    // pjax 支持
    document.addEventListener('pjax:complete', initMikuWalker);
})();
