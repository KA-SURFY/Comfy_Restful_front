import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import QuestionListItem from './QuestionListItem';


const QuestionList = (props) => {
    const { questions } = props;

    const options = [];
    for(let i=0; i<questions.length; i++){
        options.push({value: questions[i].question.id, label: '문항 ' + (i+1)})
    }

    const questionId = useSelector(state => state.result.questionId);
    const [value, setValue] = useState(0);

    useEffect(()=> {
        setValue(questionId);
    }, [questionId])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className='text-center w-full h-full'>

            <select className="block appearance-none text-2xl lg:w-40 lg:h-16 mt-6 ml-6 pl-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={value} onChange={handleChange}>
                {options && options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
                {questions && questions.map((question) => {
                    return (
                        <QuestionListItem
                            key = {question.question.id}
                            questions={question}
                            value={value}
                        />
                    )
                })}
            
        </div>
    )
}

export default QuestionList;