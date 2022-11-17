import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import axios from 'axios';
import SurveyService from '../../../../services/ResultService';
import * as Sentry from "@sentry/react";

function QuestionListItem(props) {
    const question = props.questions;
    const value = props.value;
    const type = question.question.type;
    const { surveyId } = useParams();
    const [data, setData]=useState();
    const [options,setOption] = useState([]);
    const [gridOptions, setGridOption] = useState([]);
    const answer_count = question.answer.length;
    const answer_options = [];
    var essay=[];
    useEffect(() => {
        if (type === "객관식_단일" || type ==="객관식_중복") {
            SurveyService.getQuestionOption(surveyId, question.question.id).then((res) => {
                setOption(res.data.result);
            })
        } else if (type === "객관식_그리드_단일" || type === "객관식_그리드_중복") {
            SurveyService.getQuestionOption(surveyId, question.question.id).then((res) => {
                setOption(res.data.result);
            })
            SurveyService.getGridOption(surveyId, question.question.id).then((res) => {
                setGridOption(res.data.result);
            })
        } else if (type=== "주관식"){
            for (var i = 0; i < answer_count; i++) {            
                // array.push(<div className='mb-2 text-xl'>{question.answer[i].essay.contents}</div>)
                essay.push(question.answer[i].essay.contents)
            }
            axios.post('http://localhost:5000/react_to_flask',{
            essay
            }).then(function(response){
                console.log(response.data)
                setData(response.data)
            }).catch(function(e){
                Sentry.captureException(e);
            });
        }
    }, [question])
    

    const answer = () => {
        var array = [];
        if (type === "객관식_단일" || type ==="객관식_중복") {

            for (let i = 0; i < options.length; i++) {
                answer_options.push({ id: options[i].contents, value: 0 })
            }
            for (let i = 0; i < answer_count; i++) {
                for (let j = 0; j < options.length; j++) {
                    if (question.answer[i].option.id === options[j].id) {
                        answer_options[j].value++;
                        break;
                    }
                }
            }

            return (<div className="lg:h-80">
                <ResponsivePie
                    data={
                        answer_options
                    }
                    margin={{ top: 40, bottom: 80 }}
                    innerRadius={0.5}
                    padAngle={1.8}
                    cornerRadius={0}
                    borderWidth={1}
                    arcLinkLabelsSkipAngle={3}
                    arcLinkLabelsTextColor="#000000"
                    arcLinkLabelsThickness={1}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    theme={{
                        labels: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                        legends: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                    }}
                    legends={[
                        {
                            anchor: 'bottom', // 위치
                            direction: 'row', // item 그려지는 방향
                            justify: false, // 글씨, 색상간 간격 justify 적용 여부
                            translateX: 20, // chart와 X 간격
                            translateY: 60, // chart와 Y 간격
                            itemsSpacing: 10, // item간 간격
                            itemWidth: 100, // item width
                            itemHeight: 18, // item height
                            itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                            itemOpacity: 1, // item opacity
                            symbolSize: 18, // symbol (색상 표기) 크기
                            symbolShape: 'circle', // symbol (색상 표기) 모양
                        }
                    ]}
                />
            </div>
            )
        } else if (type === "객관식_그리드_단일" || type === "객관식_그리드_중복") {
            const answer_op = {};
            const answer = [];

            for (var i = 0; i < options.length; i++) {
                for (var j = 0; j < gridOptions.length; j++) {
                    const obj = { [gridOptions[j].contents]: 0 }
                    Object.assign(answer_op, obj);
                }

                const a = Object.assign({ contents: options[i].contents }, answer_op)
                answer.push(a);
            }


            for (let i = 0; i < answer.length; i++) {
                for (let j = 0; j < answer_count; j++) {
                    for (let k = 0; k < gridOptions.length; k++) {
                        if (answer[i].contents === question.answer[j].option.contents
                            && question.answer[j].grid.contents === gridOptions[k].contents) {
                            answer[i][gridOptions[k].contents]++;
                        }
                    }
                }
            }

            const dataKeys = gridOptions.map((key)=> {
                return key.contents;
            });

            return (<div className="lg:h-80 text-center">
                <ResponsiveBar
                    data={answer}
                    keys={
                        dataKeys
                    }
                    indexBy="contents"
                    margin={{ top: 50, right: 150, bottom: 70, left: 150 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Grid',
                        legendPosition: 'middle',
                        legendOffset: 40
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Option',
                        legendPosition: 'middle',
                        legendOffset: -50
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={function (e) { return e.id + ": " + e.formattedValue }}
                />
            </div>
            )

        } else if (type === "만족도") {
            let sum = 0;
            for (var i = 0; i < answer_count; i++) {
                sum = sum + question.answer[i].satisfaction.percent;
            }
            array.push(<div className='mb-2 text-xl'>{parseFloat(sum / answer_count).toFixed(0)}</div>)
            return array;
        } else if (type === "슬라이더") {
            let sum = 0;
            for (var i = 0; i < answer_count; i++) {
                sum = sum + question.answer[i].slider.value;
            }
            array.push(<div className='mb-2 text-xl'>{parseFloat(sum / answer_count).toFixed(2)}</div>)
            return array;
        }
        else { // 주관식
            return data;
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{parseInt(value) === question.question.id && question.question.contents}</h2>
            {parseInt(value) === question.question.id && answer()}

        </>
    );
}

export default QuestionListItem;