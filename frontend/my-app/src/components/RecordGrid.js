import React, { useEffect, useState } from 'react';

const ArrowButton = ({ direction, onClick, size }) => {
    const arrowClass = direction === 'left' ? 'left-arrow' : 'right-arrow';

    const buttonStyle = {
        borderWidth: `${size}px ${size * 1.6}px ${size}px 0`, // 동적으로 크기를 조절
    };

    return (
        <div className={`arrow-button ${arrowClass}`} style={buttonStyle} onClick={onClick}></div>
    );
};

function secondsToHHMM(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${hoursString}H ${minutesString}M`;
  }

function GridItem(props) {
    const content = props.keys
    const javaCode = content.code
    const title = content.name
    const runTime = content.runTime
    const gCo2 = content.carbonFootprint



    return <div className="record-grid-item">
        <h4>{title}</h4>
        <hr></hr>
       <div className='record-grid-javacode'>{javaCode}</div>
       <hr></hr>
       <div className='record-grid-result'>
        runtime : {runTime}s<br/>
        CarbonFootprint : {gCo2} gCo2
       </div>
    
    </div>
}

function RecordGrid(props) {
    const [record, setRecord] = useState({
        "message": "success",
        "posts": [
            {
                "id": 0, // 계산결과 id
                "name": "테스트용 제목1", // 계산결과에 대한 제목
                "code": 'public class HelloWorld {\n\
                    public static void main(String[] args) {\n\
                        System.out.println("Hello, World!");\n\
                    }\n\
                }', // 코드 내용
                "runTime": "123", // 실행시간
                "hostName": "string", // 계산 시 호스트 주소
                "os": "string", // 운영체제
                "platform": "string", // 운영체제 플랫폼
                "arch": "string", // 운영체제 아키텍처
                "version": "string", // 운영체제 버전
                "cores": "string", // cpu 코어 갯수
                "cpuName": "string", // cpu 이름
                "cpuSpeed": "string", // cpu 속도
                "carbonFootprint": "123", // 탄소배출량
                "energyNeeded": "string", // 필요 전력량
                "PUE": "string", // 에너지 효율성
                "PSF": "string", // PSF
            },
            {
                "id": 1, // 계산결과 id
                "name": "테스트용 제목2", // 계산결과에 대한 제목
                "code": 'import java.util.Scanner;\n\
\n\
                public class UserInput {\n\
                    public static void main(String[] args) {\n\
                        Scanner scanner = new Scanner(System.in);\n\
                        System.out.print("Enter your name: ");\n\
                        String name = scanner.nextLine();\n\
                        System.out.println("Hello, " + name + "!");\n\
                    }\n\
                }', // 코드 내용
                "runTime": "4125", // 실행시간
                "hostName": "string", // 계산 시 호스트 주소
                "os": "string", // 운영체제
                "platform": "string", // 운영체제 플랫폼
                "arch": "string", // 운영체제 아키텍처
                "version": "string", // 운영체제 버전
                "cores": "string", // cpu 코어 갯수
                "cpuName": "string", // cpu 이름
                "cpuSpeed": "string", // cpu 속도
                "carbonFootprint": "532", // 탄소배출량
                "energyNeeded": "string", // 필요 전력량
                "PUE": "string", // 에너지 효율성
                "PSF": "string", // PSF
            },
            {
                "id": 2, // 계산결과 id
                "name": "테스트용 제목3", // 계산결과에 대한 제목
                "code": 'public class ConditionalLoop {\n\
                    public static void main(String[] args) {\n\
                        int number = 7;\n\
                \n\
                        if (number % 2 == 0) {\n\
                            System.out.println("The number is even.");\n\
                        } else {\n\
                            System.out.println("The number is odd.");\n\
                        }\n\
                \n\
                        for (int i = 1; i <= 5; i++) {\n\
                            System.out.println("Iteration " + i);\n\
                        }\n\
                    }\n\
                }', // 코드 내용
                "runTime": "12", // 실행시간
                "hostName": "string", // 계산 시 호스트 주소
                "os": "string", // 운영체제
                "platform": "string", // 운영체제 플랫폼
                "arch": "string", // 운영체제 아키텍처
                "version": "string", // 운영체제 버전
                "cores": "string", // cpu 코어 갯수
                "cpuName": "string", // cpu 이름
                "cpuSpeed": "string", // cpu 속도
                "carbonFootprint": "123", // 탄소배출량
                "energyNeeded": "string", // 필요 전력량
                "PUE": "string", // 에너지 효율성
                "PSF": "string", // PSF
            },
            
            {
                "id": 3, // 계산결과 id
                "name": "테스트용 제목4", // 계산결과에 대한 제목
                "code": 'public class ArrayExample {\n\
                    public static void main(String[] args) {\n\
                        int[] numbers = {1, 2, 3, 4, 5};\n\
                \n\
                        for (int num : numbers) {\n\
                            System.out.print(num + " ");\n\
                        }\n\
                        System.out.println();\n\
                    }\n\
                }', // 코드 내용
                "runTime": "315", // 실행시간
                "hostName": "string", // 계산 시 호스트 주소
                "os": "string", // 운영체제
                "platform": "string", // 운영체제 플랫폼
                "arch": "string", // 운영체제 아키텍처
                "version": "string", // 운영체제 버전
                "cores": "string", // cpu 코어 갯수
                "cpuName": "string", // cpu 이름
                "cpuSpeed": "string", // cpu 속도
                "carbonFootprint": "134", // 탄소배출량
                "energyNeeded": "string", // 필요 전력량
                "PUE": "string", // 에너지 효율성
                "PSF": "string", // PSF
            },
            {
                "id": 4, // 계산결과 id
                "name": "테스트용 제목5", // 계산결과에 대한 제목
                "code": 'class Rectangle {\n\
                    int length;\n\
                    int width;\n\
                \n\
                    Rectangle(int l, int w) {\n\
                        length = l;\n\
                        width = w;\n\
                    }\n\
                \n\
                    int calculateArea() {\n\
                        return length * width;\n\
                    }\n\
                }\n\
                \n\
                public class ObjectExample {\n\
                    public static void main(String[] args) {\n\
                        Rectangle myRectangle = new Rectangle(5, 10);\n\
                        int area = myRectangle.calculateArea();\n\
                        System.out.println("Area of the rectangle: " + area);\n\
                    }\n\
                }', // 코드 내용
                "runTime": "320", // 실행시간
                "hostName": "string", // 계산 시 호스트 주소
                "os": "string", // 운영체제
                "platform": "string", // 운영체제 플랫폼
                "arch": "string", // 운영체제 아키텍처
                "version": "string", // 운영체제 버전
                "cores": "string", // cpu 코어 갯수
                "cpuName": "string", // cpu 이름
                "cpuSpeed": "string", // cpu 속도
                "carbonFootprint": "2431", // 탄소배출량
                "energyNeeded": "string", // 필요 전력량
                "PUE": "string", // 에너지 효율성
                "PSF": "string", // PSF
            },
        ],
        "totalCount": 5 // 조회된 계산결과 갯수
    });

    const gridItems = [];

    
    const [pageNum, setPageNum] = useState(0);

    // useEffect( () => {
    // const fetchData = async (event) => {


    //     event.preventDefault();
    
    //     try {
    //       const response = await fetch('http://localhost:8000/post', {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         // body: JSON.stringify({ javaCode }),
    //       });
    
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    
    //       const data = await response.json();
    //       console.log('Server Response:', data);
    //       if(data.message == "success"){
    //         setRecord(data)
    //       }
    
    //       // 서버 응답에 대한 추가 로직을 여기에 추가할 수 있습니다.
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    // 테스트용
    
    const gridContents = record.posts;
    const recordSize = record.totalCount;

    // 3x3 그리드 아이템 생성
    for (let i = pageNum * 9 + 0; i < pageNum * 9 + 9; i++) {
        if (i < recordSize) {
            gridItems.push(<GridItem keys={gridContents[i]}></GridItem>);
        }
    }

    const handleLeftClick = () => {
        // 위쪽 화살표 클릭 시 수행할 동작
        //   console.log('left arrow clicked');
        if (pageNum > 0) setPageNum(pageNum - 1)
    };

    const handleRightClick = () => {
        // 아래쪽 화살표 클릭 시 수행할 동작
        //   console.log('right arrow clicked');
        if (pageNum < Math.floor(gridContents.length / 9)) setPageNum(pageNum + 1)
    };

    const handlePageClick = (selectedPage) => {
        setPageNum(selectedPage);
      };    


    // 페이지 목록 생성(하단)
    const pageList = [];
    for (let i = 0; i <= Math.min(Math.floor(gridContents.length / 9), 9); i++) {
        const isActive = i === pageNum;
        pageList.push(
            <div key={i} className={`page-number ${isActive ? 'active' : ''}`} onClick={() => handlePageClick(i)}>
                {i + 1}
            </div>
        );
    }
    

    return (
        <div>
            <div className="record-grid-container">
                {gridItems}
            </div>
            <div className='page-move'>
                <ArrowButton direction="left" onClick={handleLeftClick} size={20} />
                <div className="page-list-container">{pageList}</div>
                <ArrowButton direction="right" onClick={handleRightClick} size={20} />
            </div>
        </div>
    );
}

export default RecordGrid;