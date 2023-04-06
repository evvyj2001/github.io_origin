<script>
    let url =
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbGz29o%2FbtrNgcGtBfI%2FbzaUnvh0SXlevptFhvYfwK%2Fimg.png";
    let alt = "고양이 이미지";
    let str = "안녕하세요. <strong>스벨트</strong> 공부중입니다.";

    let num = 0; //state(상태값)

    //기존 변수값에서 1씩 증가
    // const increaseNumber = () => num++;
    const msg = () => {
        // if (num % 5) {
        //     return;
        // } else {
        //     alert(`${num}은 5의 배수입니다`);
        // }
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

    const resetNumber = () => {
        num = 0;
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

    let count = 1;

    // 조건절
    $: if (count >= 10) {
        alert("10개 이상 구매할 수 없습니다.");
        count = 9;
    }
    $: if (count <= 0) {
        alert("최소 구매개수는 1개입니다.");
        count = 1;
    }

    function plusHandle() {
        count++;
    }
    function minusHandle() {
        count--;
    }

    // 곱하기 구하기
    // 변수선언
    let cnt = 1;

    // 반응성 변수 선언
    $: doubled = cnt * 2;
    $: square = cnt * cnt;

    function handleClick() {
        cnt++;
        if (cnt == 12) {
            alert("12입니다!");
            cnt = 0;
        }
    }

    let m = { x: 0, y: 0 };

    // function handleMouseMove(event) {
    //     m.x = event.clientX;
    //     m.y = event.clientY;
    // }

    function popClose(e) {
        // const popup = document.querySelector("#popup");
        const popup = e.target.parentElement;
        console.dir(e.target);
        popup.style.display = "none";
    }

    function handleClickOnce() {
        console.log("클릭은 한번만 제공합니다.");
    }
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
        <button class="num" on:click={decreaseNumber}>-</button>
        <button class="num" on:click={increaseNumber}>+</button>
        <button class="num" on:click={resetNumber}>reset</button>
        <hr />
        <p>클릭 횟수 : {num}</p>
    </li>
    <!-- <li>
        <button class="click-btn" on:click={handleClick}>
            {count}번
            {count === 1 ? "time" : "times"}
        </button>
    </li> -->
</ul>
<!-- <div class="artist-wrap">
    {#each artist as item}
        <ul>
            <li>이름 : {item.name}</li>
            <li>나이 : {item.age}</li>
            <li>키 : {item.height}</li>
            <li>소속 : {item.group}</li>
        </ul>
    {/each}
</div> -->
<ul class="list">
    <li>on 이벤트</li>
    <li style="display: flex;">
        <button class="num" on:click={minusHandle}>-</button>
        <input
            type="text"
            value={count}
            style="width: 25px; border-width: 1px 0; border-style: solid; border-color: #ccc;text-align: center;"
            readonly />
        <button class="num" on:click={plusHandle}>+</button>
    </li>
</ul>
<ul class="list">
    <li>
        <button on:click={handleClick} style="background: #ccc; padding: 5px 10px;">
            클릭 <span>{cnt}<span /></span></button>
        <p>두배 구하기 {cnt} x 2 = {doubled}</p>
        <p>제곱 구하기 {cnt} x {cnt} = {square}</p>
    </li>
    <li
        id="popup"
        on:mousemove={(e) =>
            (m = {
                x: e.clientX,
                y: e.clientY,
            })}
        style="width: 100%; height: 100vh; background: rgba(0,0,0,0.15); position: absolute; top:0; left:0; text-align: right;">
        x 좌표 : {m.x}<br />
        y 좌표 : {m.y}
        <button on:click={popClose}>닫기</button>
    </li>
    <li>
        <button on:click|once={handleClickOnce}>한번만</button>
        <button on:preventdefault|once={handleClickOnce}>한번만</button>
    </li>
</ul>
