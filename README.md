# 소프트웨어공학개론 Team5
Ecode helper

## DB 최초 세팅 방법

1. `.env` 파일을 `backend` 디렉토리에 생성합니다.
2. `.env` 파일을 다음과 같이 작성합니다.
    ```
        DATABASE_URL="mysql://username:password@host:port/databaseName"
        JWT_SECRET="원하는 값"
    ```
    1. `username`: mysql 에 등록된 계정이름입니다.
    2. `password`: 계정의 비밀번호입니다.
    3. `host`: 해당 DB 가 실행되고 있는 host 정보입니다. 따로 서버가 없는 경우에는 `localhost` 를 입력합니다.
    4. `port`: database 에 접속할 수 있는 port 번호입니다. mysql 의 경우에는 보통 `3306` 을 사용합니다.
    5. `databaseName`: DB 의 이름을 작성합니다. 해당 DB 는 이미 mysql 서버에 생성이 되어있어야 합니다. 
    6. `JWT_SECRET`: 로그인에 JWT 를 사용하기 때문에 꼭 필요합니다. 

3. `backend` 디렉토리로 이동하여 아래의 명령어를 입력합니다.
    ```bash
        npx prisma db push
    ```

4. 만약에 더미데이터가 필요한 경우에는 아래의 명령어를 입력합니다.
    ```bash
        npm run seed
    ```

5. 데이터베이스를 확인하고 싶은 경우에는 `backend` 디렉토리에서 아래의 명렁어를 입력합니다.
    ```bash
        npx prisma studio
    ```

## 외부 API(ip2location.io) 사용을 위한 세팅

1. 위에서 설정한 `.env` 파일에 다음과 같은 설정을 추가해줍니다. 
    ```
        GEO_KEY="KEY 값"
    ```
    1. `GEO_KEY`: `ip2location.io` 사이트에서 새로 계정을 만든 후에 KEY 값을 얻어서 사용합니다. (42F5B8CE2468F718A600FAB0F2A61EC7)