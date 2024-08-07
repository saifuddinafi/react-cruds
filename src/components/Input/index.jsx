const Input = (props) => {
  const { type, label, error, ...inputProps } = props;

  return (
    <div>
      {type !== 'checkbox' && <label>{label}</label>}
      <input className={`form-control ${error ? 'is-invalid' : ''}`} type={type} {...inputProps} />
      {type === 'checkbox' && <label>{label}</label>}
      {error && error.map((err, index) => <p key={index} className="invalid-feedback">* {err}</p>)}
    </div>
  );
};

export default Input;
