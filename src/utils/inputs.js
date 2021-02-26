import "./style.min.css";

export const Input1 = ({
  label,
  type = "text",
  value,
  required = true,
  onChange,
}) => (
  <div className="form-group">
    <label className="label">{label}</label>
    <input
      className="input input1"
      type={type}
      value={value}
      required={required}
      onChange={onChange}
    />
  </div>
);

export const Input2 = ({
  label,
  type = "text",
  value,
  required = true,
  onChange,
}) => (
  <div className="form-group">
    <label className="label">{label}</label>
    <textarea
      className="input input2"
      type={type}
      value={value}
      required={required}
      onChange={onChange}
    />
  </div>
);

export const Input3 = ({ label, required = true, options, onChange }) => (
  <div className="form-group">
    <label className="label">{label}</label>
    <select className="input input3" required={required} onChange={onChange}>
      <option>please select</option>
      <>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </>
    </select>
  </div>
);

export const Input4 = ({ label, required = true, onChange }) => (
  <div className="form-group">
    <label className="label">{label}</label>
    <input
      className="input"
      type="file"
      name="photo"
      accept="image/*"
      onChange={onChange}
      required={required}
    />
  </div>
);

export const Input5 = ({ type = "text", value, required = true, onChange }) => (
  <input
    className="input input5"
    type={type}
    value={value}
    required={required}
    onChange={onChange}
  />
);

export const Input6 = ({ required = true, options, onChange }) => (
  <select className="input input6" required={required} onChange={onChange}>
    <option>please select</option>
    <>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </>
  </select>
);
