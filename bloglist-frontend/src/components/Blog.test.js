import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const mockHandler = jest.fn()

const testBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test.url',
    likes: 9001,
    user: {
        username: 'testuser',
        name: 'Test User',
        id: '0123456789'
    }
}


test('blog is rendered, only title and author shown by default', () => {
    const component = render(
        <Blog blog={testBlog} userId='1234567890' />
    )
    const titleAuthor = component.container.querySelector('.titleAuthor')
    expect(titleAuthor).toHaveTextContent('Test Blog Test Author')
})

test('everything is shown when button is clicked', () => {
    const component = render(
        <Blog blog={testBlog} userId='1234567890' />
    )
    const button = component.getByText('Show')
    fireEvent.click(button)
    const infoBox = component.container.querySelector('.blogInfoBox')
    expect(infoBox).toHaveTextContent('Test Blog Test Author test.url Likes: 9001 Like Test User Hide')
})

test ('like called twice when clicked twice', () => {

    const component = render (
            <div className='blogInfoBox'>
                {testBlog.title} <br />
                {testBlog.author} <br />
                {testBlog.url} <br />
                Likes: {testBlog.likes} <button onClick={mockHandler}>Like</button> <br />
                {testBlog.user.name} <br />
            </div>
    )
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls.length).toBe(2)
})