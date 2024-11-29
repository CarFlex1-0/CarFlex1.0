export default function FormField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="form-control">
      <label className="label font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered"
      />
    </div>
  );
}

