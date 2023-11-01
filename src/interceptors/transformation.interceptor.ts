import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, catchError, map, of, tap } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) { }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(      
      map((data) => ({
        message:
          this.reflector.get<string>(
            'response_message',
            context.getHandler(),
          ) ||
          data.message ||
          '',
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data || [],
      })),
      catchError((error) => {
        try {
          if (error instanceof PrismaClientKnownRequestError) {
            if(error?.code === 'P2025') {
              return of(error?.meta)
            }
            return of(error)            
          }
          return of(context.switchToHttp().getResponse().statusCode, error)           
        } catch (err) {
          return of(err)          
        }   
            
      }),
    );
  }
}