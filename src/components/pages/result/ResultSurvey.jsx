import React, {useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SurveyService from '../../../services/ResultService';
import { getSurveyDetails } from '../../../modules/result';
import { getIndividual } from '../../../modules/result';
import QuestionResult from './QuestionResult';
import IndividualShow from './IndividualShow';
// import * as Sentry from "@sentry/react";

const ResultSurvey = () => {
  const { surveyId } = useParams();

  const dispatch = useDispatch();
  const survey = useSelector(state => state.result.surveyDetails);
  const respondent = useSelector(state => state.result.respondents);

  useEffect(() => {
    if (survey.id !== surveyId) {
      SurveyService.getSurvey(surveyId).then((res) => {
        dispatch(getSurveyDetails(res.data.result));
      })
      SurveyService.getSurveyIndividual(surveyId).then((res) => {
        dispatch(getIndividual(res.data.result));
      })
      // .catch(e => {
      //     Sentry.captureException(e);
      // })

    } else {
      console.log("설문지 내용, 응답자 수 데이터가 이미 있습니다.");
      return;
    }
  }, [])

  const [address, setAddress] = useState(<IndividualShow />);

  const onIndividual = () => setAddress(<IndividualShow />);
  const onQuestion = () => setAddress(<QuestionResult />);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900"> 한눈에 보는 결과</h2>

        <div className="min-w-max mb-4 grid grid-cols-1 gap-y-10 text-center gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div className="min-w-max rounded-md border py-14 flex-column" >
          <h3 className="m-2 text-dark text-2xl font-weight-bold">{surveyId} 번 설문지입니다.</h3>
            <h2 className="m-2 text-xl font-weight-bold text-dark">설문 제목: {survey.title}</h2>
            <h2 className="m-2 text-xl font-weight-bold text-dark">설문 내용: {survey.contents}</h2>
          </div>

          <div className="p-4 min-w-max rounded-md d-flex border flex-column">
            <h3 className="m-2 text-2xl font-weight-bold">응답자 수</h3>
            <ResponsivePie
              width = {330}
              height = {350}
              data={[
                {
                  id: '응답자', //필수항목 답변 개수
                  value: respondent.length
                }
              ]}
              margin={{ top: 20,bottom: 50}}
              innerRadius={0.5}
              padAngle={1.8}
              cornerRadius={0}
              colors={['lightblue', 'lightyellow']}
              borderWidth={1}
              arcLinkLabelsSkipAngle={0}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}

              legends={[
                {
                  anchor: 'bottom', // 위치
                  direction: 'row', // item 그려지는 방향
                  justify: false, // 글씨, 색상간 간격 justify 적용 여부
                  translateX: 20, // chart와 X 간격
                  translateY: 50, // chart와 Y 간격
                  itemsSpacing: 0, // item간 간격
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

          <div className="min-w-max grid rounded-md border items-center grid-cols-1 gap-x-6 sm:grid-cols-1 xl:gap-x-8">

            <div className="p-2 d-flex flex-column ">
              <h2 className="m-2 text-2xl font-weight-bold text-dark w-100 h-100">만족도</h2>
              <h2 className="m-3 text-xl font-weight-bold text-dark w-100 h-100">
                {survey.satisfaction}</h2>
            </div>

            <div className="p-2 d-flex flex-column ">
              <h2 className="m-2 text-2xl font-weight-bold text-dark w-100 h-100">마감일</h2>
              <h2 className="m-3 text-xl font-weight-bold text-dark w-100 h-100">
                {survey.end}</h2>
            </div>


            <div className="p-2 d-flex flex-column ">
              <h2 className="m-2 text-2xl font-weight-bold text-dark w-100 h-100">설문 상태</h2>
              <h2 className="m-3 text-xl font-weight-bold text-dark w-100 h-100">
                {survey.type}</h2>
            </div>

          </div>
        </div>

        <button onClick={onIndividual}>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 hover:opacity-50">개별 보기</h2>
        </button>

        <button onClick={onQuestion} style={{ marginLeft: "15px" }}>
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 hover:opacity-50">문항별 보기</h2></button>

        <div className="border rounded-md">
          {address}
        </div>
      </div>
    </div>


  );
}

export default ResultSurvey;