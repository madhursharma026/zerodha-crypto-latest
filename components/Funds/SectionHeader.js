import { CiCircleInfo } from 'react-icons/ci'
import { FaCodiepie } from 'react-icons/fa6'

export default function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="row">
      <div className="col-sm-4">
        <p className="fs-6 d-flex align-items-center gap-2">
          <Icon />
          {title}
        </p>
      </div>
      <div className="col-sm-8 pt-sm-0 pb-3 text-primary">
        <div className="text-sm-end mediumFontSize">
          <FaCodiepie /> view statement &emsp;
          <CiCircleInfo /> console
        </div>
      </div>
    </div>
  )
}
