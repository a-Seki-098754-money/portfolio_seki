// ページトップに戻る機能
document.addEventListener("DOMContentLoaded", () => {
  const pageTopButton = document.querySelector(".back-to-top")

  if (pageTopButton) {
    pageTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // メニューの外側をクリックした時にメニューを閉じる
  const menuCheckbox = document.getElementById("menu-btn-check")
  const menuContent = document.querySelector(".menu-content")

  document.addEventListener("click", (e) => {
    if (menuCheckbox.checked && !e.target.closest(".hamburger-menu") && !e.target.closest(".menu-content")) {
      menuCheckbox.checked = false
    }
  })

  // メニューリンクをクリックした時にメニューを閉じる
  const menuLinks = document.querySelectorAll(".menu-content a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuCheckbox.checked = false
    })
  })

  // キーボードでのメニュー操作（Escapeキーでメニューを閉じる）
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuCheckbox.checked) {
      menuCheckbox.checked = false
    }
  })

  // 作品アイテムのアクセシビリティ向上
  const workItems = document.querySelectorAll(".work-item")
  workItems.forEach((item) => {
    const link = item.querySelector("a")
    const description = item.querySelector(".work-description")

    // キーボードフォーカス時にも説明を表示
    link.addEventListener("focus", () => {
      item.classList.add("focused")
    })

    link.addEventListener("blur", () => {
      item.classList.remove("focused")
    })

    // タッチデバイス対応
    link.addEventListener("touchstart", (e) => {
      e.preventDefault()
      item.classList.toggle("touch-active")
    })
  })

  // 背景画像の読み込み完了を待つ
  const img = new Image()
  img.onload = () => {
    document.body.classList.add("bg-loaded")
  }
  img.src = "img/棚背景＿直したやつ.png"

  // リサイズ時の処理
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // リサイズ後の処理があればここに追加
      console.log("Window resized")
    }, 250)
  })

  // スクロール時の処理
  let ticking = false
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // パララックス効果（軽微）
        document.body.style.backgroundPositionY = `${scrollTop * 0.1}px`

        ticking = false
      })
      ticking = true
    }
  })
})

// スムーズスクロール機能
function smoothScrollTo(target) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// 画像の遅延読み込み（パフォーマンス向上）
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  // data-src属性を持つ画像があれば監視対象に追加
  const lazyImages = document.querySelectorAll("img[data-src]")
  lazyImages.forEach((img) => imageObserver.observe(img))
}

// タッチデバイス用のホバー効果
if ("ontouchstart" in window) {
  const workItems = document.querySelectorAll(".work-item")

  workItems.forEach((item) => {
    item.addEventListener("touchstart", function (e) {
      // 他のアイテムのtouch-activeクラスを削除
      workItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("touch-active")
        }
      })

      // 現在のアイテムにtouch-activeクラスをトグル
      this.classList.toggle("touch-active")
    })
  })

  // 外側をタッチした時にtouch-activeクラスを削除
  document.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".work-item")) {
      workItems.forEach((item) => {
        item.classList.remove("touch-active")
      })
    }
  })
}
