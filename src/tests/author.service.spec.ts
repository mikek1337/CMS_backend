import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AuthorService } from '../services/author';

describe('Author Service test suite', () =>{
    let mockDB: any;
    let authorService: AuthorService;
    let authorData={
        id: '1',
        userId: '1',    
        createdAt: new Date(),
        updatedAt: new Date(),
    }   
    beforeEach(()=>{
        mockDB = {
            author:{
                findMany: vi.fn().mockResolvedValue([{
                    id: '1',
                    userId: '1',
                    user:{
                        id: '1',
                        name: 'John Doe',
                        email: 'test@gmail.com',
                    }
                }]),
                findFirst: vi.fn().mockResolvedValue({
                    ...authorData,
                })
            },
            user:{
                findMany: vi.fn().mockResolvedValue([{
                    id: '1',
                    userId: '1',
                    user:{
                        id: '1',
                        name: 'John Doe',
                        email: 'test@gmail.com',
                    }
                }]),
                findFirst: vi.fn().mockResolvedValue({
                    ...authorData,
                })
            }
        }
        authorService = new AuthorService(mockDB);
    });

    test('getAuthorByUserId should return author data',async()=>{
        const result = await authorService.getAuthorByUserId('1');
        expect(result).toEqual(authorData)
    })
    
    test('getAuthorByUserId should throw error if author not found',async()=>{
        mockDB.user.findFirst.mockResolvedValue(null);
        await expect(authorService.getAuthorByUserId('1')).rejects.toThrow("Author not found");
    })
})