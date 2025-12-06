export class ProductGallery extends HTMLElement {
  private shadow: ShadowRoot;
  private _images: string[] = [];
  private currentIndex: number = 0;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set images(value: string[]) {
    this._images = Array.isArray(value) ? value : [];
    this.currentIndex = 0;
    this.render();
  }

  get images() {
    return this._images;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .container {
          display: flex;
          gap: 10px;
        }

        .thumbnails {
          width: 60px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .thumb {
          width: 100%;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: .2s;
        }

        .thumb.active {
          border-color: #3483fa;
        }

        /* --- ZOOM STYLE --- */
        .zoom-wrapper {
          width: 400px;
          height: 400px;
          overflow: hidden;
          position: relative;
          border-radius: 8px;
          background: #fff;
          cursor: zoom-in;
        }

        .main-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.25s ease;
          transform-origin: center center;
        }

        .main-img.zoomed {
          cursor: zoom-out;
          transform: scale(2.3);
        }

        /* Fullscreen */
        .fullscreen {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
        }

        .fullscreen img {
          max-width: 90vw;
          max-height: 90vh;
        }
      </style>

      <div class="container">
        <div class="thumbnails">
          ${this._images
            ?.map(
              (img, i) => `
                <img
                  src="${img}"
                  class="thumb ${i === this.currentIndex ? "active" : ""}"
                  data-index="${i}"
                />
            `
            )
            .join("") ?? ""}
        </div>

        <div class="zoom-wrapper">
          <img class="main-img" src="${this._images[this.currentIndex] ?? ""}" />
        </div>
      </div>
    `;

    this.loadEvents();
  }

  loadEvents() {
    const thumbs = this.shadow.querySelectorAll(".thumb");
    const img = this.shadow.querySelector(".main-img");
    const wrapper = this.shadow.querySelector(".zoom-wrapper");

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        this.currentIndex = Number(thumb.getAttribute("data-index"));
        this.render();
      });
    });

    if (!img || !wrapper) return;

    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      img.classList.add("zoomed");
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    });

    wrapper.addEventListener("mouseleave", () => {
      img.classList.remove("zoomed");
    });
  }

  openFullscreen(src: string) {
    const div = document.createElement("div");
    div.className = "fullscreen";

    div.innerHTML = `<img src="${src}"/>`;

    div.addEventListener("click", () => div.remove());

    document.body.appendChild(div);
  }
}

customElements.define("product-gallery", ProductGallery);
