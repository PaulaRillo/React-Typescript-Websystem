import { Box, Divider } from '@mui/material';
import { useMemo } from 'react';
import { ModalContainer, ModalHeader } from 'shared/components/Modal';
import { Modal } from 'shared/components/Modal/components/Modal';
import {
  Section,
  SectionContent,
  SectionHeader
} from 'shared/components/Section';
import { PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import { Permission } from '../../components/Permission';
import { useRoles } from '../../hooks/useRoles';
import * as styles from './styles';

export const RoleModalView = () => {
  const { open, handleClose, activeRole } = useRoles();

  const roleName = useMemo(() => {
    if (!activeRole?.name) return '';
    return (
      {
        Accountant: tr('shared.accountant'),
        Administrator: tr('shared.administrator'),
        Approver: tr('shared.approver'),
        Auditor: tr('shared.auditor'),
        Payer: tr('shared.payer')
      }[activeRole.name] || activeRole.name
    );
  }, [activeRole?.name]);

  return (
    <Modal open={open} maxWidth="md" onClose={handleClose}>
      <ModalContainer sx={{ height: 600 }}>
        <ModalHeader
          title={`${roleName} ${tr('shared.permissions')}`}
          divider
          sx={styles.modalHeader}
          onClose={handleClose}
        />
        <Box sx={styles.content}>
          <Section>
            <SectionHeader title={tr('shared.bills')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_BILL}
                title={tr('settings.access.roles.viewAllBills.title')}
                description={tr(
                  'settings.access.roles.viewAllBills.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.PAY_BILL}
                title={tr('settings.access.roles.payApprovedBills.title')}
                description={tr(
                  'settings.access.roles.payApprovedBills.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.COMMENT_BILL}
                title={tr('settings.access.roles.addComments.title')}
                description={tr(
                  'settings.access.roles.addComments.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.sync-status.step.vendors')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_VENDOR}
                title={tr('settings.access.roles.viewVendors.title')}
                description={tr(
                  'settings.access.roles.viewVendors.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_VENDOR}
                title={tr('settings.access.roles.manageVendors.title')}
                description={tr(
                  'settings.access.roles.manageVendors.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.users')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_USER}
                title={tr('settings.access.roles.viewUsers.title')}
                description={tr('settings.access.roles.viewUsers.description')}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_USER}
                title={tr('settings.access.roles.manageUsers.title')}
                description={tr(
                  'settings.access.roles.manageUsers.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.roles')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_ROLE}
                title={tr('settings.access.roles.viewRoles.title')}
                description={tr('settings.access.roles.viewRoles.description')}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_ROLE}
                title={tr('settings.access.roles.manageRoles.title')}
                description={tr(
                  'settings.access.roles.manageRoles.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.group')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_GROUP}
                title={tr('settings.access.roles.viewGroups.title')}
                description={tr('settings.access.roles.viewGroups.description')}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_GROUP}
                title={tr('settings.access.roles.manageGroups.title')}
                description={tr(
                  'settings.access.roles.manageGroups.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.company')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_COMPANY}
                title={tr('settings.access.roles.viewCompanies.title')}
                description={tr(
                  'settings.access.roles.viewCompanies.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_COMPANY}
                title={tr('settings.access.roles.manageCompanies.title')}
                description={tr(
                  'settings.access.roles.manageCompanies.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader
              title={`${tr('shared.security')} & ${tr('shared.access')}`}
            />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_INTEGRATION}
                title={tr('settings.access.roles.viewIntegrations.title')}
                description={tr(
                  'settings.access.roles.viewIntegrations.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_CONNECTION}
                title={tr('settings.access.roles.manageConnections.title')}
                description={tr(
                  'settings.access.roles.manageConnections.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.EXECUTE_CONNECTION_SYNC}
                title={tr('settings.access.roles.executeConnectionSync.title')}
                description={tr(
                  'settings.access.roles.executeConnectionSync.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.reports')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_REPORT}
                title={tr('settings.access.roles.viewReports.title')}
                description={tr(
                  'settings.access.roles.viewReports.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.CREATE_REPORT}
                title={tr('settings.access.roles.manageReports.title')}
                description={tr(
                  'settings.access.roles.manageReports.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.EXPORT_REPORT}
                title={tr('settings.access.roles.exportReports.title')}
                description={tr(
                  'settings.access.roles.exportReports.description'
                )}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionHeader title={tr('shared.workflow')} />
            <SectionContent>
              <Permission
                permissionId={PermissionKey.VIEW_APPROVAL_WORKFLOW}
                title={tr('settings.access.roles.viewApprovalWorkflow.title')}
                description={tr(
                  'settings.access.roles.viewApprovalWorkflow.description'
                )}
              />
              <Divider light />
              <Permission
                permissionId={PermissionKey.MANAGE_APPROVAL_WORKFLOW}
                title={tr('settings.access.roles.manageApprovalWorkflow.title')}
                description={tr(
                  'settings.access.roles.manageApprovalWorkflow.description'
                )}
              />
            </SectionContent>
          </Section>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
