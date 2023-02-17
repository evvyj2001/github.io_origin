<script>
    let url =
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbGz29o%2FbtrNgcGtBfI%2FbzaUnvh0SXlevptFhvYfwK%2Fimg.png";
    let alt = "고양이 이미지";
    let str = "안녕하세요. <strong>스벨트</strong> 공부중입니다.";

    let num = 0; //state(상태값)

    //기존 변수값에서 1씩 증가
    // const increaseNumber = () => num++;
    const msg = () => {
        if (num % 2) {
            return;
        } else {
            alert(`${num}은 2의 배수입니다`);
        }
    };
    const increaseNumber = () => {
        num++;
        msg();
    };

    //기존 변수값에서 1씩 감소
    const decreaseNumber = () => {
        num--;
        msg();
    };

    //객체 속성을 state로 활용
    let artist = [
        {
            name: "XIUMIN1",
            age: "34",
            height: "unknown",
            group: "EXO",
        },
        {
            name: "XIUMIN2",
            age: "34",
            height: "unknown",
            group: "EXO",
        },
        {
            name: "XIUMIN3",
            age: "34",
            height: "unknown",
            group: "EXO",
        },
    ];
</script>

<ul class="list">
    <li>제품들</li>
    <li>
        <img src={url} alt={alt} />
    </li>
    <li>
        {str}<br />
        {@html str}
    </li>
    <li>
        <h3>버튼 클릭 이벤트</h3>
        <button on:click={increaseNumber}>+</button>
        <button on:click={decreaseNumber}>-</button>
        <hr />
        <p>클릭 횟수 : {num}</p>
    </li>
</ul>
<div class="artist-wrap">
    {#each artist as item}
        <ul>
            <li>이름 : {item.name}</li>
            <li>나이 : {item.age}</li>
            <li>키 : {item.height}</li>
            <li>소속 : {item.group}</li>
        </ul>
    {/each}
</div>
