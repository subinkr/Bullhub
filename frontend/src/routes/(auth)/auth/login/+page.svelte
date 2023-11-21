<script>
    import {hostName} from '$lib/stores.js'
	import { slide } from "svelte/transition";

    let signup = false;
    let nickname = null;
    let password = null;
    let repeatPassword = null;
    let filename = null;

    function toSignup() {
        signup = true;
        setTimeout(()=>{
            const imageWrapper = document.querySelector('.image-wrapper')
            const image = document.querySelector('.image');
            const img = document.querySelector('.temp');
            image.addEventListener('change', async (e) => {
                const imageData = new FormData(imageWrapper)
                const response = await fetch(`${$hostName}/image`, {
                    method: 'post',
                    body: imageData
                })
                const result = await response.json();
                filename = result.filename;
                img.src = `${$hostName}/public/temp/${filename}`;
            })
        }, 0)
    }

    

</script>

<article class="grid">
    <div>
        <div class="title">
            <h3>로그인</h3>
        </div>
        <form action="?/login" method="post">
            <input
                type="text"
                name="username"
                placeholder="ID"
                autocomplete="username"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                autocomplete="current-password"
                required
            />
            <button
                type="submit"
                class="contrast login"
            >
                로그인
            </button>
        </form>
        <button
            class="secondary"
            on:click={toSignup}
        >
            회원가입
        </button>
    </div>
    {#if signup}
    <div in:slide={{x: 100, duration: 1000}}>
        <div class="title">
        <img class="temp" src="" alt="">
        {#if nickname}
        <h3>{nickname}님 환영합니다!</h3>
        {:else}
        <h3>회원가입</h3>
        {/if}
        <img src="" alt="" style="opacity: 0;">
        </div>
        <form action="?/signup" method="post">
            <input
                type="text"
                name="username"
                placeholder="ID"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                bind:value={password}
                required
            />
            {#if password && password === repeatPassword}
            <input
                type="password"
                name="password"
                placeholder="Repeat Password"
                class="green"
                bind:value={repeatPassword}
                required
            />
            {:else}
            <input
                type="password"
                name="password"
                class="red"
                placeholder="Repeat Password"
                bind:value={repeatPassword}
                required
            />
            {/if}
            <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                bind:value={nickname}
                required
            />
            <form action='' class="image-wrapper" enctype="multipart/form-data">
                <input class="image" name="file" type="file">
            </form>
            <input name="image" type="text" value={filename} style="display: none;">
            <button
                type="submit"
                class="contrast"
            >
                회원가입
            </button>
        </form>
    </div>
    {:else}
    <strong class="message">방문해 주셔서<br>감사합니다!</strong>
    {/if}
</article>

<style>
    article {
        padding: 64px;
        margin: 64px 0
    }
    h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0;
    }
    .message {
        font-size: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4.5rem;
        gap: 16px;
    }
    .red:focus {
        border: 2px solid red;
    }
    .green {
        border: 2px solid green;
    }
    form {
        margin: 0;
    }
    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>