import { IAuditInfo } from './audit_info'
import { BaseRecord, IBaseRecord } from './base_record'

export interface IBaseRecordAudit extends IBaseRecord {
  auditInfo?: IAuditInfo
}

export class BaseRecordAudit extends BaseRecord implements IBaseRecordAudit {
  public auditInfo?: IAuditInfo

  constructor (id?: string, name?: string, auditInfo?: IAuditInfo) {
    super(id, name)
    this.auditInfo = auditInfo
  }
}
