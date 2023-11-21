<script>
    export let board;

    $: imageUrl = `http://localhost:4000${board.user.image}`
</script>

<nav>
    <ul>
        <li>{board.id}</li>
        <li><a href="/boards/board_id/{board.id}" class="contrast">{board.title.split().length > 20 ? board.title.slice(0,20) + "..." : board.title} [{board.commentsCount}]</a></li>
    </ul>
    <ul>
        <li><img class="profile-image" src={imageUrl} alt="">&nbsp;&nbsp;&nbsp;{board.user.nickname}</li>
        <li>{board.likesCount}</li>
        <li>{board.viewsCount}</li>
    </ul>
</nav>
<hr>

<style>
    li {
        min-width: 72px;
        text-align: center;
    }
    .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>