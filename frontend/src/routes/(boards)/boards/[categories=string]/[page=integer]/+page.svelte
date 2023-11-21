<script>
    import BoardList from '../../component/BoardList.svelte'
    import { page } from '$app/stores';
    import { user, hostName } from '$lib/stores.js'

    $user = $page.data.boardList.user;
    
    $: ({ boardList } = $page.data);
    $: ({ categories } = $page.params);
</script>

<article>
    <h3>{$page.params.categories}</h3>
    <nav>
        <ul>
            <li>id</li>
            <li>글 제목</li>
        </ul>
        <ul>
            <li>작성자</li>
            <li>추천</li>
            <li>조회수</li>
        </ul>
    </nav>
    <hr>
    {#each boardList.data.list[0] as board}
        <div><BoardList {board} /></div>
    {/each}
    {#if $user}
        <a href="/boards"><button class="contrast">글쓰기</button></a>
    {:else}
        <a href="/auth/login"><button class="contrast">글쓰기</button></a>
    {/if}
    <nav class="page">
        <ul>
            <li class="separator">|</li>
            {#each boardList.data.pages as page}
            {#if page === boardList.data.currentPage}
                 <li><strong>{page}</strong></li>
            {:else}
                 <li><a href='/boards/{categories}/{page}' class="contrast">{page}</a></li>
            {/if}
            <li class="separator">|</li>
            {/each}
        </ul>
    </nav>
</article>

<style>
    button {
        margin-top: 48px;
    }
    hr {
        border: solid 1px #ccc;
    }
    li {
        min-width: 72px;
        text-align: center;
    }
    .page {
        display: flex;
        justify-content: center;
    }
    .separator{ 
        color: #eee;
    }
</style>