const Filter = ({ onChange, value }) => {
    return (
        <label>
            Find contacts by name
            <br />
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
        </label>
    )
}
export default Filter;