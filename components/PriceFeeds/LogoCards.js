import Image from 'next/image'
import styles from './pricefeeds.module.css'

export default function LogoCards() {
  const logos = [
    'https://framerusercontent.com/images/PlvDMVyNJxXShy2OYhvtiEqnYao.svg',
    'https://framerusercontent.com/images/yg85X7hf9LjEEU59pOrNSgqQvM.svg',
    'https://framerusercontent.com/images/RRSmapuHSITfO20NkqUHMVwzk.svg',
    'https://framerusercontent.com/images/dxUu2BZE01R36Jf6hpHF6oKkt2U.svg?scale-down-to=512',
    'https://framerusercontent.com/images/sKg4JgeOWg62D9FHZ4xHPOBvJA.svg?scale-down-to=512',
    'https://framerusercontent.com/images/YoCm0MiGZuWU0hA5cLM8RqmYI.svg?scale-down-to=512',
    'https://framerusercontent.com/images/Ceu15kPDvhPtgXOaihdtwtzJ44.svg?scale-down-to=512',
    'https://framerusercontent.com/images/BXpjwsoaDXyJp3jBitbTtr9kGEA.svg?scale-down-to=512',
    'https://framerusercontent.com/images/R2DnvsdenDBwEkDHQ7e0h3XtoJY.svg?scale-down-to=512',
    'https://framerusercontent.com/images/wYc4f8udBCF5KTZeZ1EyoYfbcI.svg?scale-down-to=512',
    'https://framerusercontent.com/images/zQtaDqJHPcJ395OfOr7KV04zPIA.svg',
    'https://framerusercontent.com/images/Zoq9pvf0scF2AiTyuP0WMtjgLg.svg?scale-down-to=512',
  ]

  return (
    <div className="container mt-4 px-4">
      <div className="row g-2">
        {logos.map((logo, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6">
            <div className={`${styles.logoCard}`}>
              <Image
                src={logo}
                alt={`logo-${index}`}
                width={120}
                height={50}
                className="img-fluid"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
