import { atom, selector } from "recoil";
import { list } from "./queries";
import { userAuthState } from "./users";

export const noteUpdatedOn = atom({
    key: 'noteUpdateOn',
    default: new Date()
})

export const noteList = selector({
    key: 'noteList',
    get: async ({get}) => {
        get(userAuthState)
        get(noteUpdatedOn)

        let notes = [];

        try {
            const { data } = await list();
console.log('noteList:', data)
            if (data && data.success) notes = data.list;
        } catch (e) { console.log(e.message)}

        return notes;
    }
})