function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass)
        });
    }
    function showTavContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTavContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTavContent(i);
                }
            })
        }
    });
}

export default tabs;