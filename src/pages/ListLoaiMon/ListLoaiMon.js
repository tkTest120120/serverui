import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../Redux/reducer';

const ListLoaiMon = () => {

    const state = useSelector((state) => state.fastFood.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <br></br><span>{state}</span> <br></br>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
};

export default ListLoaiMon;