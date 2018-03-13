import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';
import { BaseFrontEntity } from './../entities/base-front-entity';
import { FrontEntityInfo } from './../entities/front-metadata';
import { FrontResponseWrapper } from '../utilities/front-response-wrapper';
import { resource } from 'selenium-webdriver/http';

@Injectable()
class EntityResource
{
    //#region Properties

    //#endregion

    //#region Methods

    constructor(private http : HttpClient ) { };

    getMetadata(info : FrontEntityInfo) : Observable<Array<any>>
    {
        let metadataUrl = this.getUrl(info) + '/' + info.metadataSufix;

        return this.http.get(metadataUrl).map( res => new FrontResponseWrapper<Array<any>>(res).data);
    }

    getSingle<TEntity extends BaseFrontEntity>( info : FrontEntityInfo, id : string) : Observable<TEntity>
    {
        return new Observable<TEntity>( observer => {
            info.loadRemoteMetadata(this).subscribe( ()=>{
                this.http.get(this.getUrl(info) + '/' + id).subscribe( res => {
                    observer.next(this.getWrappedEntity<TEntity>(info, res));
                    observer.complete();
                });
            });
        });
    }

    getCollection<TEntity extends BaseFrontEntity>( info : FrontEntityInfo ) : Observable<Array<TEntity>>
    {         
        return new Observable<Array<TEntity>>( observer => {
            
            this.http.get(this.getUrl(info)).subscribe( res => {
            
                var resolve = () => {
                    observer.next(this.getWrappedCollection<TEntity>(info, res))
                    observer.complete();
                };

                if (!info.isMetadataReady())
                    info.loadRemoteMetadata(this).subscribe( () => resolve());
                else
                    resolve();            
            });
            
        });
    }

    save<TEntity extends BaseFrontEntity>( entity : TEntity, onProcess : () => void, onFinish : () => void ) : Observable<TEntity>
    {
        return new Observable<TEntity>( suscriber => {
            entity.entityInfo.loadRemoteMetadata(this).subscribe( ()=>{
                onProcess();
                this.http.post(this.getUrl(entity.entityInfo), entity.serializePersistentObject()).subscribe( res => {

                    //HERE SHOULD BE PROCCESSED THE LOGIC OF THE WRAPPER...

                    suscriber.next(this.getWrappedEntity<TEntity>(entity.entityInfo, res));
                    onFinish();
                    suscriber.complete();
                });
            });
        });
    }

    delete<TEntity extends BaseFrontEntity>( entity : TEntity, onProcess : () => void, onFinish : () => void) : Observable<void>
    {
        return new Observable<void>( suscriber => { 
            onProcess();
            this.http.delete( this.getUrl(entity.entityInfo) + '/'+ entity.id ).subscribe( ()=> {

                //HERE SHOULD BE PROCCESSED THE LOGIC OF THE WRAPPER
                
                suscriber.next();
                onFinish();
                suscriber.complete();
            });
        });
    }

    private getUrl(info : FrontEntityInfo) : string
    {
        let url = AppConfig.baseUrl + info.resourceName;
        return url;
    }
    
    private getWrappedEntity<TEntity extends BaseFrontEntity>(info : FrontEntityInfo, responseData : any) : TEntity
    {
        var wrapper = new FrontResponseWrapper<TEntity>(responseData, (data)=> info.activateInstace<TEntity>(this, data) );
        return wrapper.data;
    }

    private getWrappedCollection<TEntity extends BaseFrontEntity>(info : FrontEntityInfo, responseData : any) : Array<TEntity>
    {
        var wrapper = new FrontResponseWrapper<Array<TEntity>>(responseData, (data)=> data.map( element => info.activateInstace<TEntity>(this, element)));
        return wrapper.data;
    }

    remoteStaticMethod<TPayload, TDetails>(info : FrontEntityInfo, methodName : string, payload : TPayload) : Observable<FrontResponseWrapper<TDetails>>
    {
        return new Observable<FrontResponseWrapper<TDetails>>( suscriber => { 
            this.http.post(this.getUrl(info) + '/' + methodName, payload).subscribe( responseData => {
                var wrappedResult = new FrontResponseWrapper<TDetails>(responseData);
                suscriber.next(wrappedResult);
                suscriber.complete();
            });
        });
    }

    //#endregion

    //#region Accessors

    //#endregion
}

export { EntityResource }