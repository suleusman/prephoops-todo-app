const SearchBar = () => (
    <form action="/" method="get">
        <div className="col-xs-3 text-right mr-2 mt-3">
            <div className="form-group">
                <input
                    className=""
                    type="text"
                    id="header-search"
                    placeholder="Search Todo Items"
                    name="s"
                />
                <button type="submit" className="btn btn-primary btn-sm ml-2">
                    Search
                </button>
            </div>
        </div>
    </form>
);

export default SearchBar;
