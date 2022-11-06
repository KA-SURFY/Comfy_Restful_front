import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IndividualList from './item/IndividualList';
import { useSelector } from 'react-redux';

const IndividualShow = () => {
    const navigate = useNavigate();
    const  {surveyId} = useParams();

    const respondent = useSelector(state => state.result.respondents);

    for(let i=0; i<respondent.length; i++){
        respondent[i].id = i+1;
    }
    
    return (
        <div>
            {respondent && <IndividualList
                answers={respondent}
                onClickItem={(item) => {
                    navigate(`/respondent/answer/${surveyId}/${item.id}`);
                }} />}
        </div>
    )
}

export default IndividualShow;
