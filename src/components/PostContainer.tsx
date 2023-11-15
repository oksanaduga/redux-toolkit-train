import React from 'react';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';
import { IPost } from '../models/IPost';

const PostContainer = () => {
    // const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(5, { pollingInterval: 1000 })
    const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(50);
    const [createPost, { error: createError, isLoading: isCreateLoading }] = postAPI.useCreatePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();

    const handleCreate = async() => {
        const title = prompt();
        await createPost({ title, body: title } as IPost);
    }

    const handleRemove = async(post: IPost) => {
        await deletePost(post);
    }

    const handleUpdate = async(post: IPost) => {
        await updatePost(post);
    }

    return (
        <div>
            <div className='post__list'>
                <button onClick={() => refetch()}>refetch</button>
                <button onClick={handleCreate}>add new post</button>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>error...</h1>}
                {posts && posts.map(post => {
                    return (<PostItem
                                remove={handleRemove}
                                update={handleUpdate}
                                key={post.id}
                                post={post}
                            />);
                })}
            </div>
        </div>
    );
};

export default PostContainer;