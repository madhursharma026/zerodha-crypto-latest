import styles from './pricefeeds.module.css'

export default function Images() {
  return (
    <>
      <div className={`p-md-5 p-4 ${styles.developerContainer}`}>
        <div
          style={{
            maxWidth: '1300px',
            margin: 'auto',
          }}
        >
          <div className="row mt-3">
            <div className="col-lg-8 mt-3">
              <img
                src="https://framerusercontent.com/images/ZsVcKGhWm0oWnPOZf8EDMUwxRc.jpeg"
                alt="#ImgNotFound"
                className="w-100 rounded-5 h-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-lg-4 mt-3">
              <img
                src="https://framerusercontent.com/images/rJ3hlf3W9oLQPPQHQnSn97vs9A.png"
                alt="#ImgNotFound"
                className="w-100 rounded-5 h-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-lg-4 mt-3">
              <img
                src="https://framerusercontent.com/images/WpSy2C0OibkImtvFcwg5can032s.jpeg"
                alt="#ImgNotFound"
                className="w-100 rounded-5 h-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-lg-4 mt-3">
              <img
                src="https://framerusercontent.com/images/7Sw3mLKLfWrJFI1xHKmm2lpLEnk.png"
                alt="#ImgNotFound"
                className="w-100 rounded-5 h-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-lg-4 mt-3">
              <img
                src="https://framerusercontent.com/images/m9uWYkfAjVrI5ReppB8ZEsG4SLY.png"
                alt="#ImgNotFound"
                className="w-100 rounded-5 h-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
