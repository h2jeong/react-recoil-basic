import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { noteUpdatedOn } from '../../store/notes'
import { commonNotification } from '../../store/notifications'
import { create } from '../../store/queries'

const Create = ({ history }) => {
    const [text, setText] = useState('')
    const setNotification = useSetRecoilState(commonNotification);
    const setUpdatedOn = useSetRecoilState(noteUpdatedOn);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await create(text);

            setNotification({
                message: data.message,
                isVisible: true
            })

            if (data.success) {
                setUpdatedOn(new Date())

                history.push('/list')
            }
        } catch(error) {
            setNotification({
                message: error.message,
                isVisible: true
            })
        }
    }
    const onCancel = () => {
        history.push('/list')
    }

    return (
        <section>
      <h3>Create Note</h3>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder='Enter note'
          required
          autoFocus
        />

        <button type='submit'>
          <strong>Submit</strong>
        </button>

        <button
          type='button'
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </section>
    )
}

export default Create
