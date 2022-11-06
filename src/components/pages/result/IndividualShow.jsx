import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IndividualList from './item/IndividualList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const IndividualShow = () => {
    const navigate = useNavigate();
    const  {surveyId} = useParams();

    const respondent = useSelector(state => state.result.respondents);

    const dispatch=useDispatch()
    for(let i=0; i<respondent.length; i++){
        respondent[i].id = i+1;
    }
    
    return (
        <div>
            {respondent && <IndividualList
                answers={respondent}
                onClickItem={(item) => {
                    dispatch({
                        type:"reset_template"
                    })
                    navigate(`/respondent/answer/${surveyId}/${item.id}`);
                }} />}
        </div>
    )
}

export default IndividualShow;
