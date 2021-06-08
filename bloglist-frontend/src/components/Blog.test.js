import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

beforeEach(/)
test('blog is rendered, only title and author shown by default', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'test.url',
        likes: 9001
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect component.container.

})