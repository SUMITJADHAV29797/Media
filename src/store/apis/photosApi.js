import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const photosApi = createApi({
    reducerPath:'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://media-backend-zfrw.onrender.com'
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: 'photo', id: photo.id }
                    })
                    tags.push({ type: 'albumPhoto', id: album.id})
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'GET',
                        params: {
                            albumId: album.id
                        },
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return[{ type: 'albumPhoto', id: album.id}]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.urlLoremFlickr({category:'abstract', width: 150, height: 150}),
                        },
                    }
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return[{ type: 'photo', id: photo.id}]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    }
                }
            }), 
        }
    }
})

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;

export { photosApi };