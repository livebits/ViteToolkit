
// define component props definition
interface SearchBarProps {
    city: string,
    setCity: (city: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({city, setCity}) => {
    return (
        <input type="text" value={city} onChange={e => setCity(e.target.value)} />
    )
}

export default SearchBar;