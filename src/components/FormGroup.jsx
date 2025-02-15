function FormGroup({label, id, name, type, value, onChange, placeholder, required=true}) {
    return (
        <div>
            <label className="col-form-label" htmlFor={id}>{label}</label>
            <div>
                <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="form-control"
                required={required}
                />
            </div>
        </div>
    );
}

export default FormGroup;