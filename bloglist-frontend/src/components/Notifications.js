export const Notification = ({ message }) => {
    if (message) {
        return (
        <div className='notification'>
            {message}
        </div>
        )
    }
    return null
}

export const ErrorMessage = ({ error }) => {
    if (error) {
        return (
            <div className='error'>
                {error}
            </div>
        )
    }
    return null

}

