<script>
    import {user, hostName} from "$lib/stores.js"
	import { fly } from "svelte/transition";
    import Footer from './component/Footer.svelte'

    let menu = false
    let chatList = []
    $: imageUrl = $user && $user.image ? `${$hostName}${$user.image}` : null

    async function active() {
        menu = !menu;
        if(menu) {
            let token;
            if(document.cookie) {
                token = document.cookie.split('token=')[1].split(';')[0]
            }

            chatList = await fetch('http://localhost/chat', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    }

    function logout() {
        document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';;
        location.href = '/'
    }
</script>

{#if menu}
<article class="menu" transition:fly={{duration:300, x:-100}}>
    <aside>
        <nav>
            <ul>
                <button class="close material-symbols-outlined contrast" on:click={() => menu = !menu}>
                    close
                </button>
                <li></li>
                {#if $user && $user.role === 'ADMIN'}
                    <li><a href="/admin" class="contrast">관리자 페이지</a></li>
                    <li><hr></li>
                {/if}
                <strong>게시판</strong>
                <li><a href="/boards/ANNOUNCEMENT/1" class="contrast">공지사항</a></li>
                <li><a href="/boards/DOMESTIC/1" class="contrast">국내주식 게시판</a></li>
                <li><a href="/boards/FOREIGN/1" class="contrast">해외주식 게시판</a></li>
                <li><a href="/boards/BITCOIN/1" class="contrast">비트코인 게시판</a></li>
                <li><hr></li>
                <strong>채팅방</strong>
                {#each chatList as chat}
                     <a href={null} on:click={(()=>getRoom(chat.id))}>{chat.id}번 채팅방</a>
                {/each}
            </ul>
        </nav>
    </aside>
</article>
{/if}

<header class="layout-header">
    <div class="container header-wrapper">
        <div class="header-left">
            <button class="material-symbols-outlined contrast" on:click={active}>
                menu
            </button>
        </div>
        <a href="/" class="contrast"><strong>BULLHUB</strong></a>
        <div class="header-right">
        {#if $user}
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" class="contrast">
                    <img class="profile-image" src={imageUrl} alt="이미지">
                    {$user.nickname}
                </summary>
                <ul role="listbox">
                    <li><a href="/users/{$user.id}">회원정보</a></li>
                    <li><button class="contrast" on:click={logout}>로그아웃</button></li>
                </ul>
            </details>
        {:else}
            <a href="/auth/login" class="contrast">로그인</a>
        {/if}
        </div>
    </div>
</header>

<hr />

<div class="container">
    <slot />
</div>

<footer class="layout-footer">
    <div class="grid">
        <Footer title="사업자 등록번호" content="132-13-55631"/>
        <Footer title="고객센터" content="tel) 02-479-4051"/>
        <Footer title="찾아오시는 길" content="서울특별시 강동구 올림픽로 650 예경빌딩 4,5,6층"/>
    </div>
</footer>

<style>
    a {
        text-decoration-line: none;
    }
    details {
        text-align: center;
        height: 40px;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    summary {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 160px;
        height: 40px;
    }
    .header-left {
        width: 160px;
    }
    .header-right {
        width: 160px;
        text-align: right;
    }
    .header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0;
        margin: 0 auto;
    }
    .menu {
        position: fixed;
        top: 0;
        min-width: 200px;
        height: 100%;
        z-index: 1;
        margin: 0;
    }
    strong {
        font-size: 28px;
    }
    .material-symbols-outlined {
        width: 64px;
        margin: 0;
    }
    .close.material-symbols-outlined {
        width: 100%;
        margin: 0;
    }
    .layout-footer {
        padding: 32px 64px;
        background-color: #333;
        min-height: 200px;
    }

    .profile-image {
        width: 32px;
        height: 32px;
        margin-left: 16px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>