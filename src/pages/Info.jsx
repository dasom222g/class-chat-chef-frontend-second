import React, { useEffect, useState } from "react";
import PrevButton from "../components/PrevButton";
import InfoInput from "../components/InfoInput";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Info = ({ sendIngredientList }) => {
  // logic
  const history = useNavigate();

  // TODO: set함수 추가하기
  const [ingredientList, setIngredientList] = useState([]); // 사용자가 입력할 재료 목록

  const addIngredient = () => {
    // 재료 추가
    const id = Date.now();
    const newItem = {
      id,
      lable: `ingredient_${id}`,
      text: "재료명",
      value: "",
    };

    // 추가
    setIngredientList([...ingredientList, newItem]);
  };

  const handleNext = () => {
    // 재료명을 최소한 1개이상 입력해야 페이지 이동
    const filteredList = ingredientList.filter((item) => item.value.trim());
    if (filteredList.length) {
      // 재료가 1개 이상인경우
      sendIngredientList(filteredList); // 부모에게 데이터 전송
      history("/chat");
      return;
    }
    // 재료를 입력하지 않은경우
    alert("최소 한개 이상의 재료를 입력해주세요");
  };

  const handleRemove = (selectedId) => {
    const filteredList = ingredientList.filter(
      (item) => item.id !== selectedId
    );
    // 삭제
    setIngredientList(filteredList);
  };

  const handleInputChange = (selectedItem) => {
    // 사용자 입력값 업데이트
    setIngredientList((prev) =>
      prev.map((item) => (item.id === selectedItem.id ? selectedItem : item))
    );
  };

  // 1. 컴포넌트가 생성됐을때 딱 한번 실행
  useEffect(() => {
    // console.log("한번만 실행!!");
  }, []);

  // 2. 페이지내에 있는 state들 중 한개라도 값이 변경되면 실행 (권장❌)
  useEffect(() => {
    // console.log("state변경");
  });

  // 3. 특정 state가 변경될때 실행
  useEffect(() => {
    // console.log("🚀 ~ ingredientList:", ingredientList);
  }, [ingredientList]);

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        <Title mainTitle={"당신의 냉장고를 알려주세요"} />
        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form>
            {/* START:input 영역 */}
            <div>
              {ingredientList.map((item) => (
                <InfoInput
                  key={item.id}
                  content={item}
                  onRemove={handleRemove}
                  onChange={handleInputChange}
                />
              ))}
            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Info;
