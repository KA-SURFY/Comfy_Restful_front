import { Ques_data_list } from "./CreateSurveyList"

function CreateSurveyTemplateItem(){
    return([
        {
            "thumbnail":1, //썸네일 1~5
            "id":0, //템플릿 id
            "ques_list":[
                {
                    "id":0,
                    "ques":"한식? 중식? 일식? 양식?", //ques는 질문 내용
                    "type":Ques_data_list()[1] //type은 질문 유형
                },
                {
                    "id":1,
                    "ques":"한식이라면? 메뉴를 추가해주세요!",
                    "type":Ques_data_list()[1]
                },
                {
                    "id":2,
                    "ques":"중식이라면? 메뉴를 추가해주세요!",
                    "type":Ques_data_list()[1]
                },
                {
                    "id":3,
                    "ques":"일식이라면? 메뉴를 추가해주세요!",
                    "type":Ques_data_list()[1]
                },
                {
                    "id":4,
                    "ques":"양식이라면? 메뉴를 추가해주세요!",
                    "type":Ques_data_list()[1]
                }
            ],
            "ans_list":[
                {
                    "temid":0,
                    "rootid":0, //root는 질문
                    "id":0,
                    "value":"한식", //value는 문항 내용
                },
                {
                    "temid":0,
                    "rootid":0,
                    "id":1,
                    "value":"중식",
                },
                {
                    "temid":0,
                    "rootid":0,
                    "id":2,
                    "value":"일식",
                },
                {
                    "temid":0,
                    "rootid":0,
                    "id":3,
                    "value":"양식",
                },
            ],
            "choice_list":[

            ],
            "intro0":"식사 메뉴 조사",
            "intro1":"어떤 메뉴로 식사할지 수요를 조사할 수 있는 설문 템플릿입니다.",
        },
    ])
}

export default CreateSurveyTemplateItem