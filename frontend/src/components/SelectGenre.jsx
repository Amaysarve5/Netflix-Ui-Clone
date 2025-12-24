import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { fetchDataByGenre } from '../store'

const SelectGenre = ({ genres, type }) => {
    const dispatch = useDispatch();

    return (
        <Select onChange={e => {
            dispatch(fetchDataByGenre({ genre: e.target.value, type }));
        }}>
            {genres.map((genre) => (
                <option value={genre.id} key={genre.id}>
                    {genre.name}
                </option>
            ))}
        </Select>
    );
};

export default SelectGenre;

const Select = styled.select`
margin-left: 5rem;
cursor: pointer;
background-color: rgba(0, 0, 0, 0.4);
border: 2px solid white;
color: white;
padding: 0.5rem;
`;


