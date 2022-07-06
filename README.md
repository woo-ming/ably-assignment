## Description
에이블리 채용과제 저장소 입니다.

## 사용 기술
- Node 16
- Typescript
- NestJS
- TypeOrm
- MySQL
- Yarn

## 사전 세팅 사항
- MySQL 서버
- 환경변수 설정

```bash
$ docker-compose up -d
$ cp .env.example .env
```

## 모듈 설치

```bash
$ yarn
```

## 앱 실행

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## API Spec
앱 실행이 된다음 [Swagger 문서](http://localhost:8000/api)에서 확인하실 수 있습니다.
> ⚠️ 실행이 안된다면 환경설정 파일에서 Port번호를 확인해 주세요!

## Application 설명
계층형 아키텍처를 적용하여 구현하였습니다.
1. Interface Layer
  - 데이터를 검증하는 역할을 합니다.
  - Applicatinon Layer, Domain Layer, Infra Layer에 의존할 수 있습니다.
  - User API와 Auth API 구현, User DTO와 Auth Dto작성을 하였습니다.
2. Application Layer
  - Usercase 들을 정의 하고 어플리케이션의 로직 제어를 관리하는 역할을 합니다.
  - DomainLayer, Infra Layer에 의존할 수 있습니다.
  - UserFacade, AuthFacade를 구현하였습니다.
3. Domain Layer
  - 업무 개념과, 상태에대한 정보, 핵심 로직을 담당하는 역할을 합니다.
  - 어디에도 의존하지 않고 핵심 로직들을 구현하였습니다.
4. Infrasturcture Layer
  - 상위 계층을 지원하는 역할을 합니다.
  - DomainLayer에 의존할 수 있습니다.
  - 문발송을 위한 NotificationModule, 데이터 영속화와 조회를 위한 PersistenceModule을 구현하였습니다.
  


